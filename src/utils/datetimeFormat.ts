export function formatter(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export function chatFormatter(date: Date): string {
  const now = new Date();
  // 오늘일 경우
  if (
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate()
  ) {
    const daytime = date.getHours() <= 12 ? "오전" : "오후";
    const hours =
      date.getHours() <= 12
        ? String(date.getHours()).padStart(2, "0")
        : String(date.getHours() - 12).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${daytime} ${hours}:${minutes}`;
  }

  // 아닐 경우
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}