const Card = ({ title, icon }) => {
  return (
    <div
      className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 to-sky-700
     text-white rounded-lg p-2 shadow-md w-52 h-28 text-center cursor-pointer"
    >
      <div className="text-3xl">
        {typeof icon === "string" && icon.includes("assets") ? (
          <img src={icon} alt={title} className="h-8 w-8 object-contain" />
        ) : (
          icon
        )}
      </div>
      <h3 className="mt-2 text-md">{title}</h3>
    </div>
  );
};

export default Card;
