import React from 'react'
import './Overview.css'
export default ({drugs,onDrugClick,onAddCart,onMore,title})=>{
    return (
    <div className="cat-overview">
    {
      !!drugs && drugs.length && drugs.map(drug=>
       <div className="category">
            <label className="title">{drug[title]}</label>
            <div className="drugs-list">
                {
                    drug["DRUGS"].map(drug=>
                    <div className="drug">
                        <img src={drug['IMAGE_SRC']}></img><br/>
                        <label onClick={()=>onDrugClick(drug['DRUG_ID'])} className="name">{drug['DRUG_NAME']}</label>
                        <label className="price">{drug['PRICE']}</label>
                        <div className="add-cart" onClick={()=>onAddCart(drug["DRUG_ID"])}><i className="fas fa-shopping-cart"></i>+</div>
                    </div>)
                }
            </div>
            <label id="more" onClick={()=>{if(title==='BRAND')onMore(drug['BRAND']);else onMore(drug['CATEGORY_ID']) }}>See more</label>
        </div>
       )
    }
    </div>
    )
}
