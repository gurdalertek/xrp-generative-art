import Link from "next/link";
import { PageHeader, Dropdown, Menu, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <PageHeader
        ghost={false}
        avatar={{
          src: "https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png",
        }}
        title={
          <Link href="/" className={styles.heading}>
            NFT Marketplace
          </Link>
        }
        subTitle="Generate artwork through AI, secure it as NFT"
        extra={
          <>
            <ul className={styles.headerList}>
              <li>
                <Space className={styles.navChild}>Collections</Space>
              </li>
              <li>
                <Space className={styles.navChild}>Stats</Space>
              </li>
              <li>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>Help Center</Menu.Item>
                      <Menu.Item>Docs</Menu.Item>
                    </Menu>
                  }
                  placement="bottom"
                  arrow
                >
                  <Space className={styles.navChild}>Learn</Space>
                </Dropdown>
              </li>
              <li>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>Profile</Menu.Item>
                      <Menu.Item>My Collections</Menu.Item>
                      <Menu.Item>Generate</Menu.Item>
                    </Menu>
                  }
                  placement="bottom"
                  arrow
                >
                  <UserOutlined className={styles.userLogo} />
                </Dropdown>
              </li>
            </ul>
          </>
        }
      />
    </div>
  );
};

export default Header;
