export const formatDateTime = (dateTime:string) => {
    // let dateTimeParts:string[] = dateTime.split(/[-:.Z]/);
    // // dateTimeParts[1]--;
    // console.log(dateTimeParts)
    // return new Date(...dateTimeParts);
    let dat:string = new Date(dateTime).toString();
    let dateTimeParts:string[] = dat.split(/[ ]/);

    return `${dateTimeParts[1]} ${dateTimeParts[2]} ${dateTimeParts[3]} ${dateTimeParts[4]}`

}