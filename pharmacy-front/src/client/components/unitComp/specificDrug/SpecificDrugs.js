import React from 'react'
import './SpecificDrugs.css'

export default ({drugs,onDrugClick,onAddCart,onMore,more}) => {
    return (
        <div className="drugs-list-container">
            <div className="drugs-list">
                {
                    !!drugs && drugs.map(drug=>
                    <div className="drug">
                        <img src={drug['IMAGE_SRC']}></img><br/>
                        <label onClick={()=>onDrugClick(drug['DRUG_ID'])} className="name">{drug['DRUG_NAME']}</label>
                        <label className="price">{drug['PRICE']}</label>
                        <div className="add-cart" onClick={()=>onAddCart(drug["DRUG_ID"])}><i className="fas fa-shopping-cart"></i>+</div>
                    </div>)
                }
            </div>
            <label id="more" onClick={onMore}>{more ?  <label>See more</label> : <label>"See less"</label> }</label>
        </div>
    )
}