const prepareDocs = doc => {
  const data = doc.data();
  if (data.timestamp) {
    data.timestamp = data.timestamp.toDate();
  }
  return {
    id: doc.id,
    ...data
  };
};
module.exports = prepareDocs;
