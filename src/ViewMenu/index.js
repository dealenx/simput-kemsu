import React from 'react';
import PropTypes from 'prop-types';

import ContentEditable from 'paraviewweb/src/React/Widgets/ContentEditableWidget';
import style from 'SimputStyle/ViewMenu.mcss';

/* eslint-disable react/jsx-no-bind */
export default class ViewMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewId: null,
      index: 0,
      editingIndex: -1,
    };

    // Bind callback
    this.addView = this.addView.bind(this);
    this.removeView = this.removeView.bind(this);
    this.editView = this.editView.bind(this);
    this.stopEditingView = this.stopEditingView.bind(this);
    this.activateSection = this.activateSection.bind(this);
  }

  componentDidUpdate() {
    if (this.state.editingIndex !== -1) {
      this.editable.setFocus();
    }
  }

  addView(viewId) {
    const viewList = this.props.data.data[viewId] || [];
    const index = viewList.length;
    const name = `${this.props.labels.getView(viewId)} ${index}`;

    viewList.push({ name });
    this.props.data.data[viewId] = viewList;

    this.activateSection(viewId, index);
  }

  removeView(viewId, index) {
    this.props.data.data[viewId].splice(index, 1);
    if (this.props.data.data[viewId].length) {
      this.activateSection(viewId, index > 0 ? index - 1 : index);
    } else {
      this.activateSection(-1, -1);
    }
  }

  editView(viewId, index) {
    this.setState({ editingIndex: `${viewId}-${index}` });
  }

  stopEditingView() {
    console.log();
    this.setState({ editingIndex: -1 });
  }

  activateSection(viewId, index) {
    const viewList = this.props.data.data[viewId] || [];
    if (viewList.length <= index) {
      viewList.push({ name: this.props.labels.getView(viewId) });
      this.props.data.data[viewId] = viewList;
    }
    this.setState({ viewId, index });
    if (this.props.onChange) {
      this.props.onChange(viewId, index);
    }
  }

  render() {
    const isActive = (viewId, idx) =>
      viewId === this.state.viewId && idx === this.state.index;

    return (
      <div className={[this.props.className, style.container].join(' ')}>
        <ul className={style.rootList}>
          {this.props.model.order.map((viewId, idx) => {
            const viewList = this.props.data.data[viewId] || [];
            const hasSubList =
              this.props.data.data[viewId] &&
              this.props.data.data[viewId].length > 0;
            const viewSize = this.props.model.views[viewId].size;
            const children = this.props.model.views[viewId].children || [];

            if (
              this.props.data.hideViews &&
              this.props.data.hideViews.indexOf(viewId) !== -1
            ) {
              return null;
            }

            return (
              <li
                key={`view-list-${viewId}`}
                className={
                  isActive(viewId, viewSize !== -1 ? 0 : viewSize)
                    ? style.activeListItem
                    : style.listItem
                }
              >
                <span onClick={this.activateSection.bind(this, viewId, 0)}>
                  {this.props.labels.getView(viewId)}
                </span>
                <i
                  className={viewSize === -1 ? style.addButton : style.hidden}
                  onClick={this.addView.bind(this, viewId)}
                />
                <ul
                  className={
                    hasSubList && viewSize !== undefined
                      ? style.list
                      : style.hidden
                  }
                >
                  {viewList.map((viewData, viewIdx) => {
                    if (this.state.editingIndex === `${viewId}-${viewIdx}`) {
                      return (
                        <li
                          key={`view-${viewId}-${viewIdx}`}
                          className={
                            isActive(viewId, viewIdx)
                              ? style.activeListItem
                              : style.listItem
                          }
                        >
                          <ContentEditable
                            ref={(c) => {
                              this.editable = c;
                            }}
                            html={viewData.name}
                            blurOnEnter
                            className={style.inLineBlock}
                            onChange={(e) => {
                              viewData.name = e.target.value;
                            }}
                            onBlur={this.stopEditingView}
                          />
                          <i
                            className={style.deleteButton}
                            style={{ visibility: 'hidden' }}
                          />
                          <i
                            className={style.editButton}
                            style={{ visibility: 'hidden' }}
                          />
                        </li>
                      );
                    }

                    return (
                      <li
                        key={`view-${viewId}-${viewIdx}`}
                        className={
                          isActive(viewId, viewIdx)
                            ? style.activeListItem
                            : style.listItem
                        }
                      >
                        <span
                          className={style.editable}
                          onClick={this.activateSection.bind(
                            this,
                            viewId,
                            viewIdx
                          )}
                        >
                          {viewData.name}
                        </span>
                        <i
                          className={style.deleteButton}
                          onClick={this.removeView.bind(this, viewId, viewIdx)}
                        />
                        <i
                          className={style.editButton}
                          onClick={this.editView.bind(this, viewId, viewIdx)}
                        />
                      </li>
                    );
                  })}
                </ul>{' '}
                {/* closes `hasSubList && viewSize !== undefined` */}
                <ul className={children.length ? style.list : style.hidden}>
                  {children.map((subViewId, subIdx) => (
                    <li
                      key={`sub-view-${subViewId}`}
                      className={
                        isActive(subViewId, subIdx)
                          ? style.activeListItem
                          : style.listItem
                      }
                    >
                      <i className={style.validIcon} />
                      <span
                        onClick={this.activateSection.bind(
                          this,
                          subViewId,
                          subIdx
                        )}
                      >
                        {this.props.labels.getView(subViewId)}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

ViewMenu.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  labels: PropTypes.object,
  model: PropTypes.object,
  onChange: PropTypes.func,
};

ViewMenu.defaultProps = {
  className: '',
  data: undefined,
  labels: undefined,
  model: undefined,
  onChange: undefined,
};
