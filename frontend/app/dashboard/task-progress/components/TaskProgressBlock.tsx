
interface IProps {
  title: string
  children?: React.ReactNode
}

export function TaskProgressBlock({ title, children }: IProps) {
  return(
    <div className="w-full min-h-full ">
      <div className="w-full flex flex-col gap-4 items-center border min-h-full rounded-2xl px-2 py-4 bg-gray-50/30">
        <div className="w-full flex items-center justify-center pb-2 border-b-2 border-dashed">
          <h2 className="font-semibold text-xl uppercase tracking-wide text-black">{title || "TITLE"}</h2>
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-2 px-2 ">
          {children}
        </div>
      </div>
    </div>
  )
}