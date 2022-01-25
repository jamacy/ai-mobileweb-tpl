import * as React from 'react'
import './index.scss'
import noData from '@assets/images/common/no_data.png'

const NoData: React.FC = () => {
    return (
        <>
            <div className='nodata'>
                <div className="nodata-img">
                    <img src={noData} alt="" />
                </div>
                <p className='nodata-text'>暂无数据</p>
            </div>
        </>
    )
}

export default NoData
