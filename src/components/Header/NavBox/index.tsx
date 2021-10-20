import Link from '../../Link';
import { NavBoxWrapper } from './styles';

export default function NavBox() {
  return(
    <NavBoxWrapper as="nav">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/artigos/">Artigos</Link>
        </li>
        <li>
          <Link href="/projetos/">Projetos</Link>
        </li>
      </ul>
    </NavBoxWrapper>
  );
}