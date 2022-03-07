import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

const getParams = (className = '') => {
  const [lang = '', params = ''] = className.split(':');
  return [lang.split('language-').pop().split('{').shift()].concat(
    params.split('&').reduce((merged, param) => {
      const [key, value] = param.split('=');
      merged[key] = value;
      return merged;
    }, {}),
  );
};

function SyntaxHiglight(props) {
  const className = props.children.props.className || '';
  const [language, { title = '' }] = getParams(className);
  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({
        className, style, tokens, getLineProps, getTokenProps,
      }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

function Codeblock(props) {
  return <SyntaxHiglight {...props} />;
}

export default Codeblock;
