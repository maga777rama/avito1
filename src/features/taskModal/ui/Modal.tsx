import {
    Button,
    Form,
    FormProps,
    Input,
    Modal as AntdModal,
    Select,
    Spin,
} from "antd";
import { useEffect } from "react";
import { Issue } from "@/entities/issue";
import { useModal } from "@/app/providers";
import { useUsers } from "@/entities/user";
import { useBoards } from "@/entities/board";
import { FieldType } from "@/features/taskModal";
import { useUpdateTask } from "@/features/updateTask";
import { useCreateTask } from "@/features/createTask";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateDraftStorage } from "@/shared/lib";
import styles from "./Modal.module.scss";

const { TextArea } = Input;
const Draft = CreateDraftStorage<FieldType>("taskDraft");

const Modal = () => {
    const { open, mode, taskId, projectIdFromBoard, closeModal } = useModal();

    const [form] = Form.useForm();

    const queryClient = useQueryClient();

    const { boards, loading: loadingBoards } = useBoards(open);
    const { users, loading: loadingUsers } = useUsers(open); // чтобы юзеры грузились когда

    const { mutateAsync: createTask } = useCreateTask();
    const { mutateAsync: updateTask } = useUpdateTask(projectIdFromBoard);

    const location = useLocation();
    const isFromBoardPage = location.pathname.startsWith("/board/");
    const shouldShowGoToBoardButton =
        mode === "Редактирование" && !isFromBoardPage;

    useEffect(() => {
        if (open && mode === "Создание") {
            const draft = Draft.get();
            if (draft) {
                form.setFieldsValue(draft);
            }
        }
    }, [open, mode]);

    useEffect(() => {
        if (open && mode === "Редактирование" && taskId) {
            const allTasks =
                queryClient.getQueryData<Issue[]>(["issues"]) ||
                queryClient.getQueryData<Issue[]>([
                    "issues",
                    projectIdFromBoard,
                ]);
            const task = allTasks?.find((t: Issue) => t.id === taskId);

            if (task) {
                form.setFieldsValue({
                    title: task.title,
                    description: task.description,
                    boardId: task.boardId,
                    priority: task.priority,
                    status: task.status,
                    assigneeId: task.assignee.id,
                });
            }
        }
    }, [open, mode, taskId, boards]);

    const handleOk = () => form.submit();

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        if (mode === "Создание") {
            await createTask(values);
            Draft.clear();
        } else if (mode === "Редактирование" && taskId) {
            await updateTask({ id: taskId, values });
        }
        closeModal();
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
        errorInfo,
    ) => {
        console.log("Failed:", errorInfo);
    };

    const loading = loadingBoards || loadingUsers;

    const navigate = useNavigate();

    const handleGoToBoard = () => {
        if (projectIdFromBoard && taskId) {
            closeModal();
            navigate(`/board/${projectIdFromBoard}`, {
                state: { taskId },
            });
        }
    };

    return (
        <AntdModal
            title={
                <div style={{ fontSize: 20, fontWeight: 600 }}>
                    {mode} задачи
                </div>
            }
            open={open}
            onOk={handleOk}
            onCancel={() => {
                closeModal();
                Draft.clear();
            }}
            afterClose={() => form.resetFields()}
            footer={[
                shouldShowGoToBoardButton && (
                    <Button key="goToBoard" onClick={handleGoToBoard}>
                        Перейти на доску
                    </Button>
                ),
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleOk}
                    size={"large"}
                >
                    {mode}
                </Button>,
            ]}
        >
            {loading ? (
                <Spin />
            ) : (
                <Form
                    form={form}
                    name="task"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600, fontSize: "18px" }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    size={"large"}
                    className={styles.customForm}
                    onValuesChange={(_, allValues) => {
                        if (mode === "Создание") {
                            Draft.save(allValues);
                        }
                    }}
                >
                    <Form.Item<FieldType>
                        label="Название"
                        name="title"
                        rules={[
                            { required: true, message: "Введите название!" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Описание"
                        name="description"
                        rules={[
                            { required: true, message: "Введите описание!" },
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Проект"
                        name="boardId"
                        rules={[
                            { required: true, message: "Выберите проект!" },
                        ]}
                    >
                        {/*Поле проекта нельзя редактировать после создания задачи — ограничение со стороны API*/}
                        <Select disabled={!!projectIdFromBoard}>
                            {boards.map((board) => (
                                <Select.Option key={board.id} value={board.id}>
                                    {board.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Приоритет"
                        name="priority"
                        rules={[
                            { required: true, message: "Укажите приоритет!" },
                        ]}
                    >
                        <Select>
                            <Select.Option value="Low">Low</Select.Option>
                            <Select.Option value="Medium">Medium</Select.Option>
                            <Select.Option value="High">High</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Статус"
                        name="status"
                        rules={[{ required: true, message: "Укажите статус!" }]}
                    >
                        <Select>
                            <Select.Option value="Backlog">
                                Backlog
                            </Select.Option>
                            <Select.Option value="InProgress">
                                InProgress
                            </Select.Option>
                            <Select.Option value="Done">Done</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Исполнитель"
                        name="assigneeId"
                        rules={[
                            { required: true, message: "Укажите исполнителя!" },
                        ]}
                    >
                        <Select>
                            {users.map((user) => (
                                <Select.Option key={user.id} value={user.id}>
                                    {user.fullName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            )}
        </AntdModal>
    );
};

export default Modal;
