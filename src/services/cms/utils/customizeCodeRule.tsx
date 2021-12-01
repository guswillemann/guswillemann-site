import { isCode, renderRule } from 'datocms-structured-text-utils';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import codeTheme from 'prism-react-renderer/themes/vsDark';

export default function customizeCoodeRule() {
  return (
    renderRule(isCode, ({ node, key }) => {
      return (
        <Highlight
          {...defaultProps}
          key={key}
          code={node.code}
          language={node.language as Language}
          theme={codeTheme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className + ' code-block'} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      );
    })
  )
};
