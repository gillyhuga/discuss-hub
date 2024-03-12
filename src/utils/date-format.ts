export const formatDate = (dateString: string | number | Date): string => {
  const today = new Date()
  const targetDate = new Date(dateString)
  const differenceInTime = today.getTime() - targetDate.getTime()
  const differenceInSeconds = Math.floor(differenceInTime / 1000)
  const differenceInMinutes = Math.floor(differenceInSeconds / 60)
  const differenceInHours = Math.floor(differenceInMinutes / 60)
  const differenceInDays = Math.floor(differenceInHours / 24)
  const differenceInWeeks = Math.floor(differenceInDays / 7)

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} detik lalu`
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes} menit lalu`
  } else if (differenceInHours < 24) {
    return `${differenceInHours} jam lalu`
  } else if (differenceInDays < 7) {
    return `${differenceInDays} hari lalu`
  } else {
    return `${differenceInWeeks} minggu lalu`
  }
}
