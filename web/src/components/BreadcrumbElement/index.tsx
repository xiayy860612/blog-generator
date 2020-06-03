import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';


const BreadcrumbElement = () => {
  const href = decodeURI(window.location.pathname)
  const keyEnd = href.endsWith("/") ? href.length - 1 : href.length
  const keys = href.substring(1, keyEnd).split("/")
  const items = keys.map((v, i, arr) => {
    if (i != arr.length - 1) {
      const itemHref = "/" + arr.slice(0, i+1).join("/")
      return <Breadcrumb.Item href={itemHref}>{v}</Breadcrumb.Item> 
    }
    return <Breadcrumb.Item>{v}</Breadcrumb.Item>
  })
  return (
    <Breadcrumb separator=">">
      {[
        <Breadcrumb.Item href="/">
          <HomeOutlined translate="default" style={{fontSize: "18px", verticalAlign: "middle"}}/>
        </Breadcrumb.Item>,
        ...items
      ]}
    </Breadcrumb>
  )
}

export default BreadcrumbElement;