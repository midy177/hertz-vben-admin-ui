import { UploadApiResult } from '../sys/model/uploadModel';
import { requestClient } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return requestClient.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}
