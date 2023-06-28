import Content from '../../atoms/Content';
import { StyledFooter } from './styles';

export default function Footer() {
  return (
    <StyledFooter className='footer'>
      <Content tag='div' hasTextCentered>
        <p>&copy; 2023 Visos teisės saugomos</p>
      </Content>
    </StyledFooter>
  );
}
