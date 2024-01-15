// components/itemList.tsx

interface ItemListProps {
  items: Item[];
  onItemSelect: (item: Item) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onItemSelect }) => {
  return (
    <div className="bg-blue-800 w-1/12 h-screen p-4 text-white" id="sidebar">
      <ul>
        {items.map((item) => (
          <li
            key={item.name}
            className="mb-2 cursor-pointer"
            onClick={() => onItemSelect(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
