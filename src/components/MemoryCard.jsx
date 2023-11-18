export const MemoryCard = ({ imageId, imageUrl, onClick }) => {
  return (
    <img
      style={{ cursor: "pointer" }}
      src={imageUrl}
      width="150px"
      height="150px"
      onClick={() => onClick(imageId)}
    />
  );
};
