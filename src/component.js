import {format} from 'date-fns'

const createItem = (title, description, dueDate) => {
    let key = "";
    const displayDueDate = () => {
        return format(dueDate, 'MM/dd/yyyy')
    }
    return {title, description, dueDate, displayDueDate, key};
};

export default createItem;