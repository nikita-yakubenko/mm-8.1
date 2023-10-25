// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Page} from '@playwright/test';

import {waitUntil} from '@e2e-support/test_action';
import {components} from '@e2e-support/ui/components';
import {duration, isSmallScreen} from '@e2e-support/util';

export default class ChannelsPage {
    readonly channels = 'Channels';
    readonly page: Page;
    readonly postCreate;
    readonly findChannelsModal;
    readonly globalHeader;
    readonly header;
    readonly headerMobile;
    readonly appBar;
    readonly sidebarLeft;
    readonly sidebarRight;
    readonly postDotMenu;
    readonly deletePostModal;

    constructor(page: Page) {
        this.page = page;
        this.postCreate = new components.ChannelsPostCreate(page.locator('#post-create'));
        this.findChannelsModal = new components.FindChannelsModal(page.getByRole('dialog', {name: 'Find Channels'}));
        this.globalHeader = new components.GlobalHeader(page.locator('#global-header'));
        this.header = new components.ChannelsHeader(page.locator('.channel-header'));
        this.headerMobile = new components.ChannelsHeaderMobile(page.locator('.navbar'));
        this.appBar = new components.ChannelsAppBar(page.locator('.app-bar'));
        this.sidebarLeft = new components.ChannelsSidebarLeft(page.locator('#SidebarContainer'));
        this.sidebarRight = new components.ChannelsSidebarRight(page.locator('#sidebar-right'));
        this.postDotMenu = new components.PostDotMenu(page.getByRole('menu', {name: 'Post extra options'}));
        this.deletePostModal = new components.DeletePostModal(page.locator('#deletePostModal'));
    }

    async goto(teamName = '', channelName = '') {
        let channelsUrl = '/';
        if (teamName) {
            channelsUrl += `${teamName}`;
            if (channelName) {
                channelsUrl += `/${channelName}`;
            }
        }

        await this.page.goto(channelsUrl);
    }

    async toBeVisible() {
        if (!isSmallScreen(this.page.viewportSize())) {
            await this.globalHeader.toBeVisible(this.channels);
        }
        await this.postCreate.toBeVisible();
    }

    async postMessage(message: string) {
        await this.postCreate.input.waitFor();
        await this.postCreate.postMessage(message);
    }

    async sendMessage() {
        await this.postCreate.sendMessage();
    }

    async getFirstPost() {
        await this.page.getByTestId('postView').first().waitFor();
        const post = await this.page.getByTestId('postView').first();
        return new components.ChannelsPost(post);
    }

    async getLastPost() {
        await this.page.getByTestId('postView').last().waitFor();
        const post = await this.page.getByTestId('postView').last();
        return new components.ChannelsPost(post);
    }

    async getNthPost(index: number) {
        await this.page.getByTestId('postView').nth(index).waitFor();
        const post = await this.page.getByTestId('postView').nth(index);
        return new components.ChannelsPost(post);
    }

    async getPostById(id: string) {
        await this.page.locator(`[id="post_${id}"]`).waitFor();
        const post = await this.page.locator(`[id="post_${id}"]`);
        return new components.ChannelsPost(post);
    }

    async getRHSPostById(id: string) {
        await this.page.locator(`[id="rhsPost_${id}"]`).waitFor();
        const post = await this.page.locator(`[id="rhsPost_${id}"]`);
        return new components.ChannelsPost(post);
    }

    async waitUntilLastPostContains(text: string, timeout = duration.ten_sec) {
        await waitUntil(
            async () => {
                const post = await this.getLastPost();
                const content = await post.container.textContent();
                return content?.includes(text);
            },
            {timeout}
        );
    }

    async waitUntilPostWithIdContains(id: string, text: string, timeout = duration.ten_sec) {
        await waitUntil(
            async () => {
                const post = await this.getPostById(id);
                const content = await post.container.textContent();

                return content?.includes(text);
            },
            {timeout}
        );
    }
}

export {ChannelsPage};
