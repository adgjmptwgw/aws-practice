# 概要
VPCの作成に関連するIPアドレスについての基礎をこちらに記述する。

# 桁数や数値について
0～255の数字を4つ並べたのがIPアドレス（IPv4）。 <br>
0.0.0.0 ～ 255.255.255.255 の範囲になる。

# ネットワーク部 / ホスト部について
下記の様にネットワーク部とホスト部で別れている。
- ネットワーク部の桁数を大きくすれば、多くのネットワークを作成できる。
- ホスト部の桁数を大きくすれば、接続できる端末数を増やせる。

![image](https://github.com/adgjmptwgw/aws-practice/assets/66456130/55ae8b7e-23d6-4f55-bc6a-5cc158b581f5)

# サブネットマスク
ネットワーク部 / ホスト部 の識別はIPアドレスを見ただけでは判別できない。
サブネットマスクを見れば判別できる。<br>

IPアドレスは2進数表記にした時は下記の構成となる。<br>
![image](https://github.com/adgjmptwgw/aws-practice/assets/66456130/e2fc6c7f-b787-40c4-91ab-e50f1a4e723f)
![image](https://github.com/adgjmptwgw/aws-practice/assets/66456130/9b04e898-5679-450f-8223-b6eee04793c1)


サブネットマスクも2進数で表記すると下記の様になる。<br>
2進数で「1」の部分がネットワーク部、「0」の部分がホスト部となる。
![image](https://github.com/adgjmptwgw/aws-practice/assets/66456130/e5648ad6-8b3a-4097-960e-7f160c59efbd)

# 参考資料
- [IPアドレスのサブネットマスクについて](https://it-biz.online/it-skills/subnet/)

# IPアドレスクラス

## クラスフルアドレス（従来型）
昔は下記の様に数種類だけのIPアドレスクラスが固定されていて、ネットワーク部やホスト部を設定できなかった。

![image](https://github.com/adgjmptwgw/aws-practice/assets/66456130/f863d529-7ceb-4397-b977-bf3ad9024b5a)
![image](https://github.com/adgjmptwgw/aws-practice/assets/66456130/01f64bed-682a-41d7-b934-db33503b354b)
![image](https://github.com/adgjmptwgw/aws-practice/assets/66456130/4b81415b-9b35-40ca-b0dd-19f27ecd5cf4)


## クラスレスアドレス
CIDRと呼ばれる仕組みで、IPアドレスを自由に（ネットワーク部/ホスト部に）区切ることができる。下記の「16」「24」の部分でサブネットマスクが判別できる。
  - 10.0.0.0/16
  - 172.31.0.0/24

**CIDR/サブネットマスク IPアドレス表** <br>
![image](https://github.com/adgjmptwgw/aws-practice/assets/66456130/ed50ce57-eb28-41df-881a-e42082a062a2)


***

