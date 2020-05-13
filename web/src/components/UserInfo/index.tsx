import React from 'react';
import { Card, Button } from 'antd';
import avatar from './avatar.png';
import Meta from 'antd/lib/card/Meta';
import { SearchOutlined, GithubOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import UserInfo from '../../reducers/UserInfo/domain';

const UserInfoCard: React.FC<UserInfo> = (props: UserInfo) => {
  const coverElement = <img src={props.avatar} />
  let icons = [
    <Button type="link" href={props.blog} icon={<HomeOutlined translate="default" />} />
  ]
  if (props.email) {
    const href = "mailto:" + props.email
    icons.push(
      <Button type="link" href={href} icon={<MailOutlined translate="default" />} />
    )
  }
  if (props.github) {
    icons.push(
      <Button type="link" href={props.github} target="_blank" icon={<GithubOutlined translate="default" />} />
    )
  }

  return (
    <Card 
      cover={coverElement}
      actions={icons}
    >
      <Meta title={props.username} description={props.motto} />
    </Card>
  );
}

export default UserInfoCard;