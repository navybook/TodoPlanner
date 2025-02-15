class Api::TasksController < ApplicationController
  def index
    tasks = current_user.tasks.order(due_date: :asc)
    respond_to do |format|
      format.html
      format.json { render json: tasks, each_serializer: TaskSerializer }
    end
  end

  def create
    task = current_user.tasks.build(task_params)
    task.due_date = task.due_date.strftime("%Y-%m-%d") if task.due_date.present?
    if task.save
      render json: task, serializer: TaskSerializer
    else
      render json: { errors: '作成できませんでした' }, status: :unprocessable_entity
    end
  end

  def update
    task = current_user.tasks.find(params[:id])
    if task.update(task_params)
      render json: task, serializer: TaskSerializer
    else
      render json: { errors: '更新できませんでした' }, status: :unprocessable_entity
    end
  end

  def destroy
    task = current_user.tasks.find(params[:id])
    if task.destroy
      render json: { message: '削除しました' }, status: :ok
    else
      render json: { errors: '削除できませんでした' }, status: :unprocessable_entity
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :due_date, :status)
  end
end
