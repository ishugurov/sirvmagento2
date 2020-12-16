<?php

namespace MagicToolbox\Sirv\Controller\Adminhtml\Settings;

/**
 * Settings backend controller
 *
 * @author    Sirv Limited <support@sirv.com>
 * @copyright Copyright (c) 2018-2020 Sirv Limited <support@sirv.com>. All rights reserved
 * @license   https://sirv.com/
 * @link      https://sirv.com/integration/magento/
 */
class FlushMagentoImagesCache extends \MagicToolbox\Sirv\Controller\Adminhtml\Settings
{
    /**
     * Flush action
     *
     * @return \Magento\Backend\Model\View\Result\Redirect
     */
    public function execute()
    {
        try {
            $this->_objectManager->create(\Magento\Catalog\Model\Product\Image::class)->clearCache();
            $this->_eventManager->dispatch('clean_catalog_images_cache_after');
            $this->messageManager->addSuccessMessage(__('The image cache was cleaned.'));
        } catch (LocalizedException $e) {
            $this->messageManager->addErrorMessage($e->getMessage());
        } catch (\Exception $e) {
            $this->messageManager->addExceptionMessage($e, __('An error occurred while clearing the image cache.'));
        }

        /** @var \Magento\Backend\Model\View\Result\Redirect $resultRedirect */
        $resultRedirect = $this->resultRedirectFactory->create();
        $resultRedirect->setPath('sirv/*/edit');

        return $resultRedirect;
    }
}
