import { memo } from "react";

const AcCardDate = memo(({ date }) => {
  const formatDate = (date) => {
    const list = ['Januari', 'Februari', 'Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
    const tanggal = new Date(date).getDate()
    const bulan = new Date(date).getUTCMonth()
    const tahun = new Date(date).getFullYear()

    return `${tanggal} ${list[bulan]} ${tahun}`
  }

  return <time data-cy="activity-item-date">{formatDate(date)}</time>
})

export default AcCardDate