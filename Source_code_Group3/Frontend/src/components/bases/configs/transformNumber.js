const transformNumber = (number) => {
        if(number !== undefined)return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
export default transformNumber;

