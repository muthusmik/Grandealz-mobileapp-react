import axios from "axios";

export const CartDrawlistHandle = async () => {

    return await axios.get(`${'https://api.grandealz.vytech.co'}/draws?skip=0&status=Publish`).then(response => {
        console.log("Responce on Cart Draw list",response.data);
         return response.data
    }).catch((err) => {
        console.log("catch error Api error.. ..", err);
    })
}