import {useEffect, useState} from "react";
import axios from "axios";

const Home = () => {
    const [menu,setMenu] = useState([]);
    const [from,setFrom] = useState("")
    const [to,setTo] = useState("")
    const [text,setText] = useState("")
    const [data,setData] = useState("")

    const getMenu = async () => {
        const response = await axios.request({
            method: 'GET',
            url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/support-languages',
            headers: {
                'X-RapidAPI-Key': '43ae469ffamsha1b3470098ee84bp1f4f62jsnf14d9cd965e5',
                'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
            }
        });
        setMenu(response.data)
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        getData()
    }
    const encodedParams = new URLSearchParams();
    encodedParams.set('from', from);
    encodedParams.set('to', to);
    encodedParams.set('text', text);
    const getData = async ()=>{
        const response = await axios.request( {
            method: 'POST',
            url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '43ae469ffamsha1b3470098ee84bp1f4f62jsnf14d9cd965e5',
                'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
            },
            data: encodedParams,
        });
        setData(response.data.trans);
    }

    useEffect(()=>{
        getMenu()
    },[])
  return(
      <form onSubmit={(event)=>handleSubmit(event)} className='w-75 p-2'>
          <div className="row">
              <div className="col-12 col-md-5 mb-3">
                  <select  onChange={(event)=>setFrom(event.target.value)} className="form-select" aria-label="Default select example">
                      <option defaultValue='auto'>Select Language</option>
                      {menu?.map((menu)=><option key={menu.code} value={menu.code}>{menu.language}</option> )}
                  </select>
              </div>
              <div className="col-12 col-md-2 mb-3 mb-md-0 text-center">
                  <i className="bi bi-arrow-left-right"></i>
              </div>
              <div className="col-12 col-md-5 mb-3">
                  <select  onChange={(event)=>setTo(event.target.value)} className="form-select" aria-label="Default select example">
                      <option defaultValue='auto'>Select change language</option>
                      {menu?.map((menu)=><option key={menu.code} value={menu.code} >{menu.language}</option> )}
                  </select>
              </div>
          </div>
          <div className="row">
              <div className="col-12 col-md-5 mb-3">
                  <textarea value={text} onChange={(e)=>setText(e.target.value)} style={{resize:"none"}} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder={"Enter your text"} required></textarea>
              </div>
              <div className="col-12 col-md-2 mb-3 mb-md-0 d-flex justify-content-center align-items-center">
                  <i className="bi bi-arrow-left-right"></i>
              </div>
              <div className="col-12 col-md-5 mb-3">
                  <div className="form-control" style={{minHeight:"92px"}}>{data}</div>
              </div>
          </div>
          <button className="btn btn-outline-primary w-100">Translate</button>
      </form>
  )
}
export default Home