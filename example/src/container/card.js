import React from 'react';
import Container from '@xorkevin/nuke/src/component/container';
import Section from '@xorkevin/nuke/src/component/section';
import {Grid, Column} from '@xorkevin/nuke/src/component/grid';
import Card from '@xorkevin/nuke/src/component/card';
import Img from '@xorkevin/nuke/src/component/image';
import Button from '@xorkevin/nuke/src/component/button';
import FaIcon from '@xorkevin/nuke/src/component/faicon';
import Description from '@xorkevin/nuke/src/component/description';

import {thamesPreview} from 'config';

const CardContainer = () => {
  return (
    <Container>
      <Section id="cards">
        <h1>Cards anyone?</h1>
        <hr />
        <Grid align="flex-start">
          <Column md={8} sm={12}>
            <Card
              height="md"
              title={
                <Img
                  className="card-border dark"
                  size="fill"
                  src="/static/thames.jpg"
                  preview={thamesPreview}
                >
                  <Container fill padded>
                    <Grid
                      fill
                      justify="space-between"
                      cjustify="flex-end"
                      align="center"
                    >
                      <Column>
                        <h3>Lorem ipsum</h3>
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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Container>
            </Card>
          </Column>
          <Column md={8} sm={12}>
            <Card
              height="md"
              title={
                <Img
                  className="card-border dark"
                  size="fill"
                  src="/static/thames.jpg"
                  preview={thamesPreview}
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
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer fringilla aliquet condimentum. Nunc facilisis orci
                  dui, sit amet dictum massa porta at. Mauris augue nisi,
                  scelerisque ac suscipit sit amet, egestas ut risus. In hac
                  habitasse platea dictumst. Vivamus nibh enim, dignissim quis
                  consequat at, sagittis in magna.
                </p>
              </Container>
            </Card>
          </Column>
          <Column md={8} sm={12}>
            <Card
              height="md"
              title={
                <Img
                  className="card-border dark"
                  size="fill"
                  src="/static/thames.jpg"
                  preview={thamesPreview}
                >
                  <Container fill padded>
                    <Grid
                      fill
                      justify="space-between"
                      cjustify="flex-end"
                      align="center"
                    >
                      <Column>
                        <h3>Consectetur</h3>
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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Container>
            </Card>
          </Column>
          <Column md={8} sm={12}>
            <Card
              height="md"
              title={
                <Img
                  className="card-border dark"
                  size="fill"
                  src="/static/thames.jpg"
                  preview={thamesPreview}
                >
                  <Container fill padded>
                    <Grid
                      fill
                      justify="space-between"
                      cjustify="flex-end"
                      align="center"
                    >
                      <Column>
                        <h3>Adipiscing elit</h3>
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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Container>
            </Card>
          </Column>
          <Column md={8} sm={12}>
            <Card
              height="md"
              title={
                <Img
                  className="card-border dark"
                  size="fill"
                  src="/static/thames.jpg"
                  preview={thamesPreview}
                >
                  <Container fill padded>
                    <Grid
                      fill
                      justify="space-between"
                      cjustify="flex-end"
                      align="center"
                    >
                      <Column>
                        <h3>Integer fringilla</h3>
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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Container>
            </Card>
          </Column>
          <Column md={8} sm={12}>
            <Card
              height="md"
              preview={thamesPreview}
              title={
                <Img
                  className="card-border dark"
                  size="fill"
                  src="/static/thames.jpg"
                  preview={thamesPreview}
                >
                  <Container fill padded>
                    <Grid
                      fill
                      justify="space-between"
                      cjustify="flex-end"
                      align="center"
                    >
                      <Column>
                        <h3>Aliquet</h3>
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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Container>
            </Card>
          </Column>
        </Grid>
        <div>
          <Card
            height="lg"
            width="lg"
            title={
              <Img
                className="card-border dark"
                size="fill"
                src="/static/thames.jpg"
                preview={thamesPreview}
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
                src="/static/thames.jpg"
                preview={thamesPreview}
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
            height="sm"
            width="sm"
            title={
              <Img
                className="card-border dark"
                size="fill"
                src="/static/thames.jpg"
                preview={thamesPreview}
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
            width="md"
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
              dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit
              sit amet, egestas ut risus. In hac habitasse platea dictumst.
              Vivamus nibh enim, dignissim quis consequat at, sagittis in magna.
            </Container>
          </Card>
        </div>
      </Section>
    </Container>
  );
};

export default CardContainer;
