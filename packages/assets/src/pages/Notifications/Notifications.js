import React, {useState} from 'react';
import {
  Layout,
  Page,
  SkeletonPage,
  ResourceList,
  ResourceItem,
  Stack,
  Pagination,
  Card,
  Spinner
} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import useFetchApi from '../../hooks/api/useFetchApi';
import useDeleteApi from '../../hooks/api/useDeleteApi';

/**
 * Notifications page
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('desc');
  const {data: notifications, loading, fetchApi: fetchNotifications} = useFetchApi({
    url: '/notifications',
    initQueries: {limit: 30, sort: sortValue}
  });
  const {deleting, handleDelete} = useDeleteApi({url: '/notifications'});

  const resourceName = {
    singular: 'notifcation',
    plural: 'notifcations'
  };

  const promotedBulkActions = [
    {
      content: 'Delete',
      onAction: async () => {
        await handleDelete({ids: selectedItems});
        await fetchNotifications('/notifications', {sort: sortValue, limit: 30});
        setSelectedItems([]);
      }
    }
  ];

  function renderItem(item) {
    const {id, firstName, city, country, productName, timestamp, productImage} = item;
    const ordetTime = new Date(timestamp);
    return (
      <ResourceItem id={id}>
        <Stack>
          <Stack.Item fill>
            <NotificationPopup
              firstName={firstName}
              city={city}
              country={country}
              productName={productName}
              timestamp={timestamp}
              productImage={productImage}
            />
          </Stack.Item>
          <Stack.Item>
            <p>
              From {ordetTime.toLocaleString('default', {month: 'long'})} {ordetTime.getDate()},
            </p>
            <p style={{textAlign: 'end'}}>{ordetTime.getFullYear()}</p>
          </Stack.Item>
        </Stack>
      </ResourceItem>
    );
  }

  if (loading || deleting)
    return (
      <SkeletonPage title="Notifications" fullWidth>
        <Card>
          <Card.Section>
            <div style={{textAlign: 'center'}}>
              <Spinner size="small" />
            </div>
          </Card.Section>
        </Card>
      </SkeletonPage>
    );
  return (
    <Page title="Notifications" subtitle="List of sales notifcation from Shopify" fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={resourceName}
              items={notifications}
              renderItem={renderItem}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              promotedBulkActions={promotedBulkActions}
              sortValue={sortValue}
              sortOptions={[
                {label: 'Newest update', value: 'desc'},
                {label: 'Oldest update', value: 'asc'}
              ]}
              onSortChange={selected => {
                setSortValue(selected);
                fetchNotifications('/notifications', {sort: selected, limit: 30});
              }}
            />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Pagination />
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
