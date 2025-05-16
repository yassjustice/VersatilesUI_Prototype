import PropTypes from 'prop-types';
import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import './CodeBlock.css';

const CodeBlock = ({ code, language = 'jsx' }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="language-tag">{language}</span>
        <button className="copy-button" onClick={handleCopy}>
          {copied ? <FiCheck /> : <FiCopy />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="code-content">
        <code>{code}</code>
      </pre>
    </div>
  );
};

CodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string
};

export default CodeBlock;
