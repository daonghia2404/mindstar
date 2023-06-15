import React from 'react';
import classNames from 'classnames';

import { TIconProps } from './Icon.types';
import { EIconName } from './Icon.enums';
import './Icon.scss';

import Google from './Google';
import ArrowLongRight from './ArrowLongRight';
import ArrowLongLeft from './ArrowLongLeft';
import AngleDown from './AngleDown';
import X from './X';
import StarOutline from './StarOutline';
import Check from './Check';
import QuestionCircle from './QuestionCircle';
import Dashboard from './Dashboard';
import School from './School';
import CreditCard from './CreditCard';
import TruckDelivery from './TruckDelivery';
import ShoppingCart from './ShoppingCart';
import Database from './Database';
import ReportAnalytics from './ReportAnalytics';
import Settings from './Settings';
import GitBranch from './GitBranch';
import Users from './Users';
import ChalkBoard from './ChalkBoard';
import Rocket from './Rocket';
import Calendar from './Calendar';
import SpeakerPhone from './SpeakerPhone';
import ClockCancel from './ClockCancel';
import Wallet from './Wallet';
import WalletOff from './WalletOff';
import Map from './Map';
import Checkbox from './Checkbox';
import Affiliate from './Affiliate';
import Category from './Category';
import BoxSeam from './BoxSeam';
import Award from './Award';
import Receipt from './Receipt';
import ReceiptRefund from './ReceiptRefund';
import WareHouse from './WareHouse';
import PackageImport from './PackageImport';
import Graph from './Graph';
import Adjustments from './Adjustments';
import UsersGroup from './UsersGroup';
import BusinessPlan from './BusinessPlan';
import CaretDown from './CaretDown';
import MapMarker from './MapMarker';
import AddressBook from './AddressBook';
import Logout from './Logout';
import DotsVertical from './DotsVertical';
import Trash from './Trash';
import Pencil from './Pencil';
import Search from './Search';
import Plus from './Plus';
import AngleLeft from './AngleLeft';
import AngleRight from './AngleRight';
import PigMoney from './PigMoney';
import Coins from './Coins';
import Eye from './Eye';
import Clock from './Clock';
import Copy from './Copy';
import UserCancel from './UserCancel';
import UserCheck from './UserCheck';
import UserX from './UserX';
import DeviceFloppy from './DeviceFloppy';
import Devices from './Devices';
import Lock from './Lock';
import ArrowExchange from './ArrowExchange';
import JewishStarFill from './JewishStarFill';
import RotateClockwise from './RotateClockwise';
import Briefcase from './Briefcase';
import JewishStar from './JewishStar';
import ShieldCancel from './ShieldCancel';
import ArrowBigUpLines from './ArrowBigUpLines';

const Icon: React.FC<TIconProps> = ({ name, className, color, onClick }) => {
  const renderIcon = (): React.ReactElement => {
    switch (name) {
      case EIconName.Google:
        return <Google color={color} />;
      case EIconName.ArrowLongRight:
        return <ArrowLongRight color={color} />;
      case EIconName.ArrowLongLeft:
        return <ArrowLongLeft color={color} />;
      case EIconName.AngleDown:
        return <AngleDown color={color} />;
      case EIconName.X:
        return <X color={color} />;
      case EIconName.StarOutline:
        return <StarOutline color={color} />;
      case EIconName.Check:
        return <Check color={color} />;
      case EIconName.QuestionCircle:
        return <QuestionCircle color={color} />;
      case EIconName.Dashboard:
        return <Dashboard color={color} />;
      case EIconName.School:
        return <School color={color} />;
      case EIconName.CreditCard:
        return <CreditCard color={color} />;
      case EIconName.TruckDelivery:
        return <TruckDelivery color={color} />;
      case EIconName.ShoppingCart:
        return <ShoppingCart color={color} />;
      case EIconName.Database:
        return <Database color={color} />;
      case EIconName.ReportAnalytics:
        return <ReportAnalytics color={color} />;
      case EIconName.Settings:
        return <Settings color={color} />;
      case EIconName.GitBranch:
        return <GitBranch color={color} />;
      case EIconName.Users:
        return <Users color={color} />;
      case EIconName.ChalkBoard:
        return <ChalkBoard color={color} />;
      case EIconName.Rocket:
        return <Rocket color={color} />;
      case EIconName.Calendar:
        return <Calendar color={color} />;
      case EIconName.SpeakerPhone:
        return <SpeakerPhone color={color} />;
      case EIconName.ClockCancel:
        return <ClockCancel color={color} />;
      case EIconName.Wallet:
        return <Wallet color={color} />;
      case EIconName.WalletOff:
        return <WalletOff color={color} />;
      case EIconName.Map:
        return <Map color={color} />;
      case EIconName.Checkbox:
        return <Checkbox color={color} />;
      case EIconName.Affiliate:
        return <Affiliate color={color} />;
      case EIconName.Category:
        return <Category color={color} />;
      case EIconName.BoxSeam:
        return <BoxSeam color={color} />;
      case EIconName.Award:
        return <Award color={color} />;
      case EIconName.Receipt:
        return <Receipt color={color} />;
      case EIconName.ReceiptRefund:
        return <ReceiptRefund color={color} />;
      case EIconName.WareHouse:
        return <WareHouse color={color} />;
      case EIconName.PackageImport:
        return <PackageImport color={color} />;
      case EIconName.Graph:
        return <Graph color={color} />;
      case EIconName.Adjustments:
        return <Adjustments color={color} />;
      case EIconName.UsersGroup:
        return <UsersGroup color={color} />;
      case EIconName.BusinessPlan:
        return <BusinessPlan color={color} />;
      case EIconName.CaretDown:
        return <CaretDown color={color} />;
      case EIconName.MapMarker:
        return <MapMarker color={color} />;
      case EIconName.AddressBook:
        return <AddressBook color={color} />;
      case EIconName.Logout:
        return <Logout color={color} />;
      case EIconName.DotsVertical:
        return <DotsVertical color={color} />;
      case EIconName.Trash:
        return <Trash color={color} />;
      case EIconName.Pencil:
        return <Pencil color={color} />;
      case EIconName.Search:
        return <Search color={color} />;
      case EIconName.Plus:
        return <Plus color={color} />;
      case EIconName.AngleLeft:
        return <AngleLeft color={color} />;
      case EIconName.AngleRight:
        return <AngleRight color={color} />;
      case EIconName.PigMoney:
        return <PigMoney color={color} />;
      case EIconName.Coins:
        return <Coins color={color} />;
      case EIconName.Eye:
        return <Eye color={color} />;
      case EIconName.Clock:
        return <Clock color={color} />;
      case EIconName.Copy:
        return <Copy color={color} />;
      case EIconName.UserCancel:
        return <UserCancel color={color} />;
      case EIconName.UserCheck:
        return <UserCheck color={color} />;
      case EIconName.UserX:
        return <UserX color={color} />;
      case EIconName.DeviceFloppy:
        return <DeviceFloppy color={color} />;
      case EIconName.Devices:
        return <Devices color={color} />;
      case EIconName.Lock:
        return <Lock color={color} />;
      case EIconName.ArrowExchange:
        return <ArrowExchange color={color} />;
      case EIconName.JewishStarFill:
        return <JewishStarFill color={color} />;
      case EIconName.RotateClockwise:
        return <RotateClockwise color={color} />;
      case EIconName.Briefcase:
        return <Briefcase color={color} />;
      case EIconName.JewishStar:
        return <JewishStar color={color} />;
      case EIconName.ShieldCancel:
        return <ShieldCancel color={color} />;
      case EIconName.ArrowBigUpLines:
        return <ArrowBigUpLines color={color} />;

      default:
        return <></>;
    }
  };

  return (
    <div className={classNames('Icon', 'flex', 'justify-center', 'items-center', className)} onClick={onClick}>
      {renderIcon()}
    </div>
  );
};

export default Icon;
