import { memo } from "react"

const AddButton = memo(({ onClick, dataCy }) => {
  return <button onClick={onClick} className="flex items-center gap-3 px-8 py-3 text-xl font-semibold rounded-full bg-primary text-white" data-cy={dataCy}>
    <svg className="w-6 h-6" viewBox="0 0 24 24"><path d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" fill="currentColor"></path></svg>
    Tambah
  </button>
})

export default AddButton