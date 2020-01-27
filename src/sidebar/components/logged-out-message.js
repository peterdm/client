import { createElement } from 'preact';
import propTypes from 'prop-types';

import { withServices } from '../util/service-context';

import SvgIcon from './svg-icon';

/**
 * Render a call-to-action to log in or sign up. This message is intended to be
 * displayed to non-auth'd users when viewing a single annotation in a
 * direct-linked context (i.e. URL with syntax `/#annotations:<annotation_id>`)
 */
function LoggedOutMessage({ onLogin, serviceUrl }) {
  return (
    <div className="logged-out-message">
      <span>
        This is a public annotation created with Hypothesis. <br />
        To reply or make your own annotations on this document,{' '}
        <a
          className="logged-out-message__link"
          href={serviceUrl('signup')}
          target="_blank"
          rel="noopener noreferrer"
        >
          create a free account
        </a>{' '}
        or {/* FIXME-A11Y */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="logged-out-message__link" href="" onClick={onLogin}>
          log in
        </a>
        .
      </span>
      <div className="logged-out-message__logo">
        <a href="https://hypothes.is">
          <SvgIcon name="logo" className="logged-out-message__logo-icon" />
        </a>
      </div>
    </div>
  );
}

LoggedOutMessage.propTypes = {
  onLogin: propTypes.func.isRequired,
  serviceUrl: propTypes.func.isRequired,
};

LoggedOutMessage.injectedProps = ['serviceUrl'];

export default withServices(LoggedOutMessage);
