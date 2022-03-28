export  default class getData{
    #fresh: boolean;
    constructor(){
        this.#fresh = false;
    }
    async getRows(rows: number){
        this.#fresh = false;
        async function request<TResponse>(
            url: string, 
            config: RequestInit = {}
            ): Promise<TResponse> {
                
                const response = await fetch(url, config);
                return await response.json();
                
            }
        let data: any;
        data = await request<any>("http://localhost:8000/").then(async response =>{
            this.#fresh = true;
            /* console.log(response)
            console.log(response[0])
            console.log(response[1])
            console.log(11111)
            
            console.log(response[0].id_cell) */
            for(let i = 0; i<rows; i++){
                console.log()
            }
            return response;
        })
        //console.log("from link ",data[0])
        return await data;
    }
    isfresh(){
        return this.#fresh;
    }
}