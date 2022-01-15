import {Fragment} from 'react';

import {Story} from 'docs';

import Card from '@xorkevin/nuke/src/component/card';
import Container from '@xorkevin/nuke/src/component/container';
import {Grid, Column} from '@xorkevin/nuke/src/component/grid';
import Img from '@xorkevin/nuke/src/component/image';
import Section from '@xorkevin/nuke/src/component/section';
import Button from '@xorkevin/nuke/src/component/button';
import FaIcon from '@xorkevin/nuke/src/component/faicon';
import Description from '@xorkevin/nuke/src/component/description';
import {shanghaiPreview} from 'config';

const Stories = () => (
  <Fragment>
    <p>
      <code>Card</code> is used to display content on an elevated surface.
    </p>

    <Story>
      <Card
        height="md"
        title={
          <Img
            className="card-border dark"
            size="fill"
            src="/static/shangai.jpg"
            preview={shanghaiPreview}
          >
            <Container fill padded>
              <Grid
                fill
                justify="space-between"
                cjustify="flex-end"
                align="center"
              >
                <Column>
                  <h3>Dolor sit amet</h3>
                </Column>
                <Column>
                  <Button label="favorite">
                    <FaIcon icon="heart" />
                  </Button>
                </Column>
              </Grid>
            </Container>
          </Img>
        }
        bar={<Button>View</Button>}
      >
        <Container padded>
          <Section subsection title="Hello, World">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
              dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit
              sit amet, egestas ut risus. In hac habitasse platea dictumst.
              Vivamus nibh enim, dignissim quis consequat at, sagittis in magna.
            </p>
          </Section>
        </Container>
      </Card>
    </Story>

    <p>
      <code>Card</code> may be sized and/or centered.
    </p>

    <Story>
      <div>
        <Card
          height="lg"
          width="lg"
          title={
            <Img
              className="card-border dark"
              size="fill"
              src="/static/shangai.jpg"
              preview={shanghaiPreview}
            >
              <Container fill padded>
                <Grid
                  fill
                  justify="space-between"
                  cjustify="flex-end"
                  align="center"
                >
                  <Column>
                    <h3>Vivamus nibh enim</h3>
                  </Column>
                  <Column>
                    <Button label="favorite">
                      <FaIcon icon="heart" />
                    </Button>
                  </Column>
                </Grid>
              </Container>
            </Img>
          }
          bar={<Button>Share</Button>}
        >
          <Container padded>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
            dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit
            sit amet, egestas ut risus. In hac habitasse platea dictumst.
            Vivamus nibh enim, dignissim quis consequat at, sagittis in magna.
            <Description label="Project" item="Nuke" />
            <Description label="Language" item="Javascript" />
          </Container>
        </Card>
        <Card
          height="md"
          width="md"
          title={
            <Img
              className="card-border dark"
              size="fill"
              src="/static/shangai.jpg"
              preview={shanghaiPreview}
            >
              <Container fill padded>
                <Grid
                  fill
                  justify="space-between"
                  cjustify="flex-end"
                  align="center"
                >
                  <Column>
                    <h3>Vivamus nibh enim</h3>
                  </Column>
                  <Column>
                    <Button label="favorite">
                      <FaIcon icon="heart" />
                    </Button>
                  </Column>
                </Grid>
              </Container>
            </Img>
          }
          bar={<Button>Share</Button>}
        >
          <Container padded>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
            dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit
            sit amet, egestas ut risus. In hac habitasse platea dictumst.
            Vivamus nibh enim, dignissim quis consequat at, sagittis in magna.
          </Container>
        </Card>
        <Card
          center
          height="sm"
          width="sm"
          title={
            <Img
              className="card-border dark"
              size="fill"
              src="/static/shangai.jpg"
              preview={shanghaiPreview}
            >
              <Container fill padded>
                <Grid
                  fill
                  justify="space-between"
                  cjustify="flex-end"
                  align="center"
                >
                  <Column>
                    <h3>Vivamus nibh enim</h3>
                  </Column>
                  <Column>
                    <Button label="favorite">
                      <FaIcon icon="heart" />
                    </Button>
                  </Column>
                </Grid>
              </Container>
            </Img>
          }
          bar={<Button>Share</Button>}
        >
          <Container padded>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
            dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit
            sit amet, egestas ut risus. In hac habitasse platea dictumst.
            Vivamus nibh enim, dignissim quis consequat at, sagittis in magna.
          </Container>
        </Card>
      </div>
    </Story>

    <p>
      <code>Card</code> need not have a media element.
    </p>

    <Story name="card text">
      <Card
        title={
          <Container fill padded>
            <Grid
              fill
              justify="space-between"
              cjustify="flex-end"
              align="center"
            >
              <Column>
                <h3>Vivamus nibh enim</h3>
              </Column>
              <Column>
                <Button label="favorite">
                  <FaIcon icon="heart" />
                </Button>
              </Column>
            </Grid>
          </Container>
        }
        bar={<Button>Share</Button>}
      >
        <Container padded>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
          dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit sit
          amet, egestas ut risus. In hac habitasse platea dictumst. Vivamus nibh
          enim, dignissim quis consequat at, sagittis in magna.
        </Container>
      </Card>
    </Story>
  </Fragment>
);

export default Stories;
