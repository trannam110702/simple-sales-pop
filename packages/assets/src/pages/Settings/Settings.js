import React, {useState, useCallback, useMemo} from 'react';
import {
  Layout,
  Page,
  Button,
  Tabs,
  Card,
  FormLayout,
  Checkbox,
  RangeSlider,
  Select,
  TextField,
  SkeletonPage,
  SkeletonBodyText
} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import DesktopPositionInput from '../../components/DesktopPositionInput/DesktopPositionInput';
import PropTypes from 'prop-types';
import useFetchApi from '../../hooks/api/useFetchApi';
import useEditApi from '../../hooks/api/useEditApi';
import defaultSettings from '../../const/defaultSettings';

const DisplayMarkup = ({settings, handleChangeSetting}) => {
  return (
    <FormLayout>
      <div style={{marginBottom: '1rem', fontWeight: 'bold'}}>APPEARANCE</div>
      <DesktopPositionInput
        value={settings.position}
        onChange={value => handleChangeSetting('position', value)}
        label="Desktop position"
        helpText="The display positon of the pop on your website"
      />
      <Checkbox
        label="Hide time ago"
        checked={settings.hideTimeAgo}
        onChange={value => handleChangeSetting('hideTimeAgo', value)}
      ></Checkbox>
      <Checkbox
        label="Truncate content text"
        helpText="If your product name is long for one line, it will be truncated to 'Product name...'"
        checked={settings.truncateProductName}
        onChange={value => handleChangeSetting('truncateProductName', value)}
      ></Checkbox>
      <div style={{marginBottom: '1rem', fontWeight: 'bold'}}>TIMING</div>
      <FormLayout.Group>
        <RangeSlider
          output
          label="Display duration"
          min={1}
          max={50}
          value={settings.displayDuration}
          onChange={value => handleChangeSetting('displayDuration', value)}
          helpText={<span>How long each pop will be displayed on your page.</span>}
          suffix={
            <div style={{padding: '1rem', border: '1px solid gray'}}>
              {settings.displayDuration} second(s)
            </div>
          }
        />
        <RangeSlider
          output
          label="Time before the first pop"
          min={1}
          max={50}
          value={settings.firstDelay}
          onChange={value => handleChangeSetting('firstDelay', value)}
          helpText={<span>The delay time before the first notifications.</span>}
          suffix={
            <div style={{padding: '1rem', border: '1px solid gray'}}>
              {settings.firstDelay} second(s)
            </div>
          }
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <RangeSlider
          width="50%"
          output
          label="Gap time between two pops"
          min={1}
          max={50}
          value={settings.popsInterval}
          onChange={value => handleChangeSetting('popsInterval', value)}
          helpText={<span>The time interval between two popup notifications.</span>}
          suffix={
            <div style={{padding: '1rem', border: '1px solid gray'}}>
              {settings.popsInterval} second(s)
            </div>
          }
        />

        <RangeSlider
          output
          label="Maxium of popups"
          min={1}
          max={80}
          value={settings.maxPopsDisplay}
          onChange={value => handleChangeSetting('maxPopsDisplay', value)}
          helpText={
            <span>
              The maxium number of popups are allowed to show after page loading. Maxium number is
              80.
            </span>
          }
          suffix={
            <div style={{padding: '1rem', border: '1px solid gray'}}>
              {settings.maxPopsDisplay} pop(s)
            </div>
          }
        />
      </FormLayout.Group>
    </FormLayout>
  );
};
const TriggersMarkup = ({settings, handleChangeSetting}) => {
  const options = [
    {label: 'All pages', value: 'all'},
    {label: 'Specific pages', value: 'specific'}
  ];
  return (
    <FormLayout>
      <Select
        label="PAGE RESTRICTION"
        options={options}
        onChange={value => handleChangeSetting('allowShow', value)}
        value={settings.allowShow}
      />
      {settings.allowShow === 'specific' && (
        <TextField
          multiline={4}
          maxHeight={200}
          label="Include pages"
          helpText="Page URLs to show the pop-up (separated by new line)"
          onChange={value => handleChangeSetting('includedUrls', value)}
          value={settings.includedUrls}
        ></TextField>
      )}
      <TextField
        multiline={4}
        maxHeight={200}
        label="Exclude pages"
        helpText="Page URLs NOT to show the pop-up (separated by new line)"
        onChange={value => handleChangeSetting('excludedUrls', value)}
        value={settings.excludedUrls}
      ></TextField>
    </FormLayout>
  );
};

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [tab, setTab] = useState(0);
  const {data: settings, setData: setSettings, loading} = useFetchApi({
    url: '/settings',
    defaultData: defaultSettings
  });
  const {editing: saving, handleEdit: handleEditSettings} = useEditApi({
    url: '/settings',
    useToast: true
  });
  const handleChangeSetting = useCallback(
    (key, value) => setSettings(prev => ({...prev, [key]: value})),
    []
  );
  const tabs = useMemo(
    () => [
      {
        id: 'display',
        content: <div>Display</div>,
        contentMarkup: (
          <DisplayMarkup settings={settings} handleChangeSetting={handleChangeSetting} />
        )
      },
      {
        id: 'trigger',
        content: <div>Triggers</div>,
        contentMarkup: (
          <TriggersMarkup settings={settings} handleChangeSetting={handleChangeSetting} />
        )
      }
    ],
    [settings]
  );

  if (loading)
    return (
      <SkeletonPage title="Settings" fullWidth primaryAction>
        <Layout>
          <Layout.Section oneThird>
            <Card sectioned>
              <Card.Section>
                <SkeletonBodyText lines={3} />
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Card.Section>
                <SkeletonBodyText lines={15} />
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );
  return (
    <Page
      title="Settings"
      subtitle="Decide how your notifications will display"
      fullWidth
      primaryAction={
        <Button
          primary
          loading={saving}
          onClick={() => {
            handleEditSettings(settings);
          }}
        >
          Save
        </Button>
      }
    >
      <Layout>
        <Layout.Section oneThird>
          <NotificationPopup
            options={{
              truncateProductName: settings.truncateProductName,
              hideTimeAgo: settings.hideTimeAgo
            }}
          />
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={tab} onSelect={setTab}>
              <Card.Section>{tabs[tab].contentMarkup}</Card.Section>
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
TriggersMarkup.propTypes = {
  settings: PropTypes.object,
  handleChangeSetting: PropTypes.func
};
DisplayMarkup.propTypes = {
  settings: PropTypes.object,
  handleChangeSetting: PropTypes.func
};
