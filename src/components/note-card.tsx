export function NoteCard () {
  return (
    <button className="relative rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
      <span className="text-sm font-medium text-slate-300">
        Há 2 dias
      </span>
      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum consequatur rem blanditiis praesentium possimus officia dicta sequi accusamus recusandae tempore et dolorem consequuntur magni, similique officiis provident eum exercitationem nihil! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor perferendis odio atque quam alias repellat porro, dolore laborum, totam doloremque numquam ad. Esse inventore doloremque eaque itaque facilis nulla sit!
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
    </button>
  )
}