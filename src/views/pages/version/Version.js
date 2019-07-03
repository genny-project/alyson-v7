import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import branch from '!!raw-loader!../../../static/git-info-branch.txt';
import commit from '!!raw-loader!../../../static/git-info-commit.txt';
import date from '!!raw-loader!../../../static/git-info-date.txt';
import { Text, Box } from '../../components';

class Version extends Component {
  static propTypes = {
  }

  render() {
    const info = {
      branch: branch.replace( /\n/g, '' ),
      commit: commit.replace( /\n/g, '' ),
      date: date.replace( /\n/g, '' ),
    };

    return (
      <Box
        justifyContent="center"
        alignItems="center"
        flex={1}
        flexDirection="column"
      >
        <Box
          justifyContent="center"
          alignItems="center"
          backgroundColor="#ECF1F8"
          padding={10}
          flexDirection="column"
          width="calc(100% - 20px)"
        >
          <Text
            color="black"
            text="Version Information"
          />

          <ReactJson src={info} />
        </Box>
      </Box>
    );
  }
}

export default Version;
