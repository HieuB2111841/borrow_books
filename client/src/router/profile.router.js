import ProfilePage from '@/views/ProfilePage.vue';
import ProfileInfo from '@/components/profile/ProfileInfo.vue';
import ProfileBorrowBook from '@/components/profile/ProfileBorrowBook.vue';
import ProfileFavoriteBook from '@/components/profile/ProfileFavoriteBook.vue';
import ProfileFollowing from '@/components/profile/ProfileFollowing.vue';

export default [
  {
    path: '/profile',
    name: 'profile',
    redirect: { name: 'profile-info' },
    component: ProfilePage,
    children: [
      {
        path: 'info',
        name: 'profile-info',
        component: ProfileInfo,
      },
      {
        path: 'borrowed',
        name: 'profile-borrowed',
        component: ProfileBorrowBook,
      },
      {
        path: 'favorites',
        name: 'profile-favorite',
        component: ProfileFavoriteBook,
      },
      {
        path: 'following',
        name: 'profile-following',
        component: ProfileFollowing,
      },
      {
        path: '', // Đường dẫn mặc định khi truy cập `/profile`
        redirect: { name: 'profile-info' }, // Sử dụng `name` để redirect
      },
    ],
  },
];
