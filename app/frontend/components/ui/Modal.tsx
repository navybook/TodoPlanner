import React from 'react'

type Props = {
  children: React.ReactNode
  modalRef: React.RefObject<HTMLDialogElement>
}

export default function Modal({ children, modalRef }: Props) {
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box h-2/3">
        {children}
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}
