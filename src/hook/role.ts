import { useUserStore } from '@/stores/modules/user';

export const role = useUserStore().getRole();
