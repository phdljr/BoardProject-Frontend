function formatDate(date) {
  const result = `${date[0]}-${date[1]}-${date[2]} ${date[3]}:${date[4]}:${date[5]}`;
  return result;
}

export { formatDate };
