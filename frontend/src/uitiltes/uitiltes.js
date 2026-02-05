
function debounce(fun, delay){
    let timer
    return function(...data){
        clearTimeout(timer)
        timer = setTimeout(()=>{
            fun(data)
        },delay)
    }
}
export default debounce