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
    if task.save
      render json: task, serializer: TaskSerializer
    else
      render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :due_date, :status)
  end
end
