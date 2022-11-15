// export const sortItems = (type, data, setData, setFilterItems) => {
//       const sortProperty = type;
//       const sorted = [...data].sort((a, b) => b[sortProperty] - a[sortProperty]);
//       setData(sorted);
//       setFilterItems(sorted);
// };

// export function filterItemByType(props) {
//     if (props.type !== "All"){
//         const filtered = [...props.groceryData].filter(item => item.type === props.type);
//         const sorted = [...filtered].sort((a, b) => b[props.sortType] - a[props.sortType]);
//         props.setData(sorted);
//         props.setFilterItems(sorted);
//     }
//     else{
//         const sorted = [...props.groceryData].sort((a, b) => b[props.sortType] - a[props.sortType]);
//         props.setData(sorted);
//         props.setFilterItems(sorted);
//     }
// };

// export function filterItemByAvailable(props) {
//     if (props.available !== "All"){
//         const filtered = [...props.filterItems].filter(item => item.available.includes(props.available));
//         props.setData(filtered);
//     }
//     else{
//         props.setData(props.filterItems);
//     }
// };
