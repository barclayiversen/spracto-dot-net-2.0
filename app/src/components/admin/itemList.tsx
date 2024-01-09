// components/itemList.tsx

interface ItemListProps {
  items: Item[];
  onItemSelect: (item: Item) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onItemSelect }) => {
  return (
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
  );
};

export default ItemList;
