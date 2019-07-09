export default (props)=>{
        let session=!!sessionStorage.number;
        if(!session)props.history.push('/')
}