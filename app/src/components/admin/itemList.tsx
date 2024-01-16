// components/itemList.tsx

interface ItemListProps {
  items: Item[];
  onItemSelect: (item: Item) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onItemSelect }) => {
  return (
    <div className="w-1/12 bg-blue-400 overflow-auto p-4">
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
