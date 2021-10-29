import { isLink, renderRule } from 'datocms-structured-text-utils';
import Link from '../../../components/Link';

export default function customizeLinkRule(ruleClassName = '') {
  return (
    renderRule(isLink, ({ node, children }) => (
      <Link
        key={node.url}
        href={node.url}
        target="_blank"
        rel="noreferrer"
        className={ruleClassName}
      >
        {children}
      </Link>
    ))
  );
}
