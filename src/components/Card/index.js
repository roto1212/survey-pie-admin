import { Button } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

function Card({title, desc, children, onMoveUp, onMoveDown, onDelete}) {
  return (
    <CardWrapper>
      <Head>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
      </Head>
      <Body>
        {children}
      </Body>
      <ButtonGroupWrapper>
        <ButtonGroup>
          <Button type="text" icon={<ArrowUpOutlined />} onClick={onMoveUp}/>
          <Button type="text" icon={<DeleteOutlined />} onClick={onDelete}/>
          <Button type="text" icon={<ArrowDownOutlined />} onClick={onMoveDown}/>
        </ButtonGroup>
      </ButtonGroupWrapper>
    </CardWrapper>
  );
}
const ButtonGroupWrapper = styled.div`
  position: absolute;
  left: calc(100%);
  top: 0;
  display: none;
  height: 100%;
`;
const ButtonGroup = styled.div`
  background: #fff;
  margin-left: 30px;
  border: 1px solid #dddddd;
  border-radius: 5px;
`;

const CardWrapper = styled.div`
  border: 1px solid #dddddd;
  width: 400px;
  margin: 30px auto;
  background-color: #fff;
  position: relative;
  &:hover ${ButtonGroupWrapper} {
    display: block;
  }
`;
const Head = styled.div`
  border-bottom: 1px solid #dddddd;
  padding: 15px;
`;
const Title = styled.div`
  font-weight: 600;
`;
const Desc = styled.div`
  color: #666666;
  margin-left: 5px;
  `;
const Body = styled.div`
  padding: 15px;
`;

export default Card;


